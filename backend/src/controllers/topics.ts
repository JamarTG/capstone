import { Request, Response } from "express";
import Topic from "../models/Topic";
import { topics, objectives,questions} from "../data/topics";

import { Objective } from "../models/Objective";


// export const seedTopics = async (req: Request,res:Response) => {
//   try {  
//     await Topic.deleteMany({});
//     await Objective.deleteMany({});
//     await Question.deleteMany({});

//     await Topic.insertMany(topics);
//     await Objective.insertMany(objectives);
//     await Question.insertMany(questions);

//     console.log("Database seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } 
// };

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({});


    const topicsWithObjectives = await Promise.all(
      topics.map(async (topic) => {
        const objectives = await Objective.find({ topic: topic._id }).select("_id description");
        return {
          ...topic.toObject(),
          objectives,
        };
      })
    );

    res.status(200).json({
      message: "Topics with objectives fetched successfully",
      count: topicsWithObjectives.length,
      topics: topicsWithObjectives,
    });
  } catch (err) {
    console.error("❌ Error fetching topics:", err);
    res.status(500).json({
      error: "Failed to fetch topics with objectives",
      details: err,
    });
  }
};
