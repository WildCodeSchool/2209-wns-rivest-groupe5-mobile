export interface IActivity {
  activityId: number;
  title: string;
  activityDate: string;
  carbonQuantity: number;
  description?: string;
  createdAt: Date;
  activityType: {
    activityTypeId: number;
    name: string;
    label: string;
    emoji?: string;
    backgroundColor: string;
  };
}
