import { ObjectId } from 'mongodb';

export interface Layoff {
  _id?: ObjectId;
  company: string;
  date: Date;
  employees: number;
  percentage?: number; // Percentage of workforce affected
  industry: string;
  source: string; // URL to news source
  location?: string; // Country or region
  reason?: string; // Reason for layoff if available
  createdAt: Date; // When this entry was created
  updatedAt: Date; // When this entry was last updated
}

export interface Company {
  _id?: ObjectId;
  name: string;
  industry: string;
  logo?: string;
  totalLayoffs: number; // Sum of all layoffs
  layoffHistory: Layoff[]; // History of all layoffs
  createdAt: Date;
  updatedAt: Date;
}

export interface Industry {
  _id?: ObjectId;
  name: string;
  totalLayoffs: number;
  companies: string[]; // List of company IDs in this industry
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  _id?: ObjectId;
  email: string;
  industries: string[]; // Industries to track
  companies?: string[]; // Optional specific companies to track
  minEmployees?: number; // Min number of employees to trigger alert
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}