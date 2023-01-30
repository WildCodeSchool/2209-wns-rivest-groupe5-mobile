export interface IActivity {
  activityId: number;
  title: string;
  activityDate: string;
  carbonQuantity: number;
  description?: string;
  createdAt: Date;
  activityType: {
    name: string;
  };
}
