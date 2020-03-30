import { Request, Response } from 'express';
import * as yup from 'yup'; // for everything
import { Project } from '../models/Project';

const projectSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  website: yup.string().required(),
  coupon: yup.object({
    title: yup.string(),
    image: yup.string(),
    expirationDays: yup.number(),
    description: yup.string()
  })
});

export const getProjects = async (req: Request, res: Response) => {
  if (req.user) {
    const projects = await Project.find({ ownerId: req.user.id });
    return res.json({
      projects: projects.map(p => p.toDto())
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const body = await projectSchema.validate(req.body, { stripUnknown: true });
  const project = await Project.findOne({ _id: body.id, ownerId: req.user.id });
  console.log('project', project);
  if (!project)
    return res
      .status(404)
      .json({ errors: [`Could not find project with id: ${body.id}`] });

  Object.assign(project, body);
  await project.save();
  return res.status(200).json({ project });
};
