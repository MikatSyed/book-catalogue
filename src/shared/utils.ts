import { ITimeSlot } from '../app/modules/offeredCourseClassSchedule/offeredCourseClassSchedule.interface';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const hasTimeConflict = (
  existingSlots: ITimeSlot[],
  newSlot: ITimeSlot
) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`2020-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`2020-01-01T${slot.endTime}:00`);
    const newStart = new Date(`2020-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`2020-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
