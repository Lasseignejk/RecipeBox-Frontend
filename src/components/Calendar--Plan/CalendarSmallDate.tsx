import { updateSelectedDay } from "../../reducers/TodaySlice";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
interface CalendarProps {
	date: {
		date: string;
		today: boolean;
		selected: boolean;
	};
}

const CalendarSmallDate = ({ date }: CalendarProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const selectedDay = useAppSelector((state) => state.today.selectedDay);
	const dayOfWeek: string = date.date.slice(0, 3);
	// const month: string = date.date.slice(4, 7);
	const dateNum: string = date.date.slice(8, 10);
	// console.log(selectedDay);

	const formatDateNum = (dateNum: string): string => {
		if (dateNum[0] == "0") {
			return dateNum[1];
		}
		return dateNum;
	};

	const todayClasses: string =
		date.today == true
			? "border-2 border-lightSurfCon text-lightPrimText font-bold rounded-md"
			: "border-2 border-lightSurfCon text-lightSecondary";

	const selectedClasses: string =
		date.date == selectedDay
			? "border-2 border-lightTertiary rounded-md font-bold text-lightTertiary"
			: "";
	return (
		<div
			data-testid="date"
			className={`flex flex-col w-full items-center hover:cursor-pointer  ${todayClasses} ${selectedClasses} `}
			onClick={() => dispatch(updateSelectedDay(date.date))}>
			<p className={`text-sm`}>{dayOfWeek}</p>
			<p className={`text-xl`}>{formatDateNum(dateNum)}</p>
		</div>
	);
};

export default CalendarSmallDate;
