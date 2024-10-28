export interface Course {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  dateCreated: Date;
  createdBy: createdBy;
}

export interface createdBy {
  id: string;
}
