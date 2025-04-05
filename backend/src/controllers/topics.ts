import { Request, Response } from "express";
import Topic from "../models/Topic";
import { topics } from "../data/topics";


export const seedTopics = async (req: Request, res: Response) => {
  try {
    await Topic.deleteMany({});
    const inserted = await Topic.insertMany(topics);
    res.status(201).json({
      message: "Topics seeded successfully",
      count: inserted.length,
      topics: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed topics", details: err });
  }
};

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({});
    res.status(200).json({
      message: "Topics fetched successfully",
      count: topics.length,
      topics,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch topics", details: err });
  }
}
