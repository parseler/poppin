import notification from  "@assets/header/notification_icon.svg";
import search from "@assets/header/search_icon.svg"
import back from "@assets/header/back_icon.svg";

const getIncon = (iconName: string): string => {
  switch (iconName) {
    case "notification":
      return notification;
    case "search":
      return search;
    case "back":
      return back;
    default:
      return "";
  }
};

export default getIncon;
