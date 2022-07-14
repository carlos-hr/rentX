import { Request, Response } from "express";
import CreateCourseService from "./services/createCourse";

export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute("eu", 2, "eu");

  return res.send();
}
