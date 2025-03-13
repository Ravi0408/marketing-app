const Campaign = require('../models/Campaign');
const { getDecodedUser } = require('./authController');
exports.addCampaign = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmpassword,
      } = req.body;

      const existingCampaign = await Campaign.findOne({ name });
      if (existingCampaign) {
        return res.status(400).json({ error: "Campaign already exists" });
      }
      const campaign = new Campaign(
            req.body        
      );
  
      await campaign.save();
    
      res.status(201).json({ success: true, message: "Campaign registered successfully" });
    } catch (err) {
      console.error("Error in registration:", err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  

  exports.getCampaigns = async (req, res) => {
    try {
        // Decode the user from the token
        // const user = await getDecodedUser(req.headers['authorization'].split(' ')[1]);

        const limit = 5; // Number of results per page
        const { page } = req.params;

        // Parse pagination parameters
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        if (pageNumber <= 0 || pageSize <= 0) {
            return res.status(400).json({ error: "Invalid pagination parameters" });
        }

        // // Get the start and end of the current day
        // const startOfDay = new Date();
        // startOfDay.setHours(0, 0, 0, 0);

        // const endOfDay = new Date();
        // endOfDay.setHours(23, 59, 59, 999);

        // Fetch paginated sessions for the current day
        const campaigns = await Campaign.find({
            // userId: user.id,
            // createdAt: { $gte: startOfDay, $lte: endOfDay },
        })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // Populate doctor and patient details
        // const populatedSessions = await Promise.all(
        //     sessions.map(async (session) => {
        //         const [user, patient] = await Promise.all([
        //             getDoctorDetails(session.userId),
        //             getPatientDetails(session.patientId),
        //         ]);

        //         return { ...session.toObject(), user, patient };
        //     })
        // );

        // // Count total sessions for today
        const totalTodaySessions = await Campaign.countDocuments({
            // userId: user.id,
            // createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        res.status(200).json({
            totalTodaySessions,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalTodaySessions / pageSize),
            populatedSessions:campaigns,
        });
    } catch (error) {
        console.error("Error fetching today's sessions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateCampaign = async (req, res) => {  
    try {
      const { id } = req.params;
      const campaign = await Campaign.findById(id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      await Campaign.findByIdAndUpdate(id, req.body);
      res.status(200).json({ success: true, message: "Campaign updated successfully" });
    }   catch (error) {
      console.error("Error in updating campaign:", error);
      res.status(500).json({ error: "Server error" });
    }

}
