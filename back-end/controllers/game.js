const Earnings = require("../models/Earnings");
const TGUser = require("../models/TGUser");

async function upscore(req, res, next) {


    // console.log(req.body)
    try {
        const { teleid, overallCoin, deductedPoints, timePlayed } = req.body;


        if (!teleid) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        const userDbDetails = await Earnings.findOne({ where: { teleid } });
        const updata = {
            "tap_points": parseInt(overallCoin),
            "game_played_time": parseInt(timePlayed),
            "game_deducted_points": parseInt(deductedPoints),
        };

        if (userDbDetails) {
            const updated = await Earnings.update(updata, { where: { teleid } });

            if (updated) {
                return res.status(200).json({ isUpdate: true, message: 'Point updated successfully' });
            } else {
                return res.status(401).json({ isUpdate: false, message: 'Point update failed', updated });
            }
        } else {
            const indata = {
                "teleid": teleid,
                "tap_points": parseInt(overallCoin),
                "game_played_time": parseInt(timePlayed),
                "game_deducted_points": parseInt(deductedPoints),
                "createdate": new Date()
            };
            const newUser = await Earnings.create(indata);
            if (newUser) {
                return res.status(200).json({ isUpdate: true, message: 'Point inserted successfully' });
            } else {
                return res.status(401).json({ isUpdate: false, message: 'Point insertion failed' });
            }
        }
    } catch (error) {
        // console.error('Error updating points:', error);
        return res.status(500).json({ isUpdate: false, message: 'Internal server error' });
    }
}

async function getscore(req, res, next) {
    try {
        const { tid } = req.body;

        if (tid) {
            const userDbDetails = await Earnings.findOne({
                where: { teleid: tid }
            });

            if (userDbDetails) {
                const value = {
                    "teleid": userDbDetails.teleid,
                    "checkin_points": userDbDetails.checkin_points,
                    "game_deducted_points": userDbDetails.game_deducted_points,
                    "game_played_time": userDbDetails.game_played_time,
                    "miner_points": userDbDetails.miner_points,
                    "ref_points": userDbDetails.ref_points,
                    "tap_points": userDbDetails.tap_points,
                    "sync": userDbDetails.modifieddate,

                }
                res.status(200).json({ isthere: true, message: 'success', value });
            } else {
                res.status(200).json({ isthere: false, message: 'no data' });
            }
        } else {
            res.status(401).json({ message: 'Invalid user' });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({ isUpdate: false, message: 'Internal server error' });
    }
}
//not over
async function sync(req, res, next) {
    try {
        const { tid } = req.body;

        if (tid) {
            const userDbDetails = await Earnings.findOne({
                where: { teleid: tid }
            });

            if (userDbDetails) {
                const value = {
                    "teleid": userDbDetails.teleid,
                    "checkin_points": userDbDetails.checkin_points,
                    "game_deducted_points": userDbDetails.game_deducted_points,
                    "game_played_time": userDbDetails.game_played_time,
                    "miner_points": userDbDetails.miner_points,
                    "ref_points": userDbDetails.ref_points,
                    "tap_points": userDbDetails.tap_points,

                }
                res.status(200).json({ isthere: true, message: 'success', value });
            } else {
                res.status(200).json({ isthere: false, message: 'no data' });
            }
        } else {
            res.status(401).json({ message: 'Invalid user' });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({ isUpdate: false, message: 'Internal server error' });
    }
}

async function getref(req, res, next) {
    const referralCode = req.ref;
    // try {
    //     const results = await TGUser.findAll({
    //         attributes: [
    //             'referral_by', [Sequelize.fn('COUNT', Sequelize.col('userid')), 'user_count'],
    //             [Sequelize.fn('GROUP_CONCAT', Sequelize.col('username')), 'usernames']
    //         ],
    //         where: {
    //             userid:telid
    //             referral_code: referralCode
    //         },
    //         group: ['referral_by'],
    //     });

    //     res.status(200).json(results);
    // } catch (error) {
    //     console.error('Error fetching grouped users:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}






module.exports = {
    upscore,
    getscore,
    getref
};