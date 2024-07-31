import BeautyIcon from "@assets/category/beauty_icon.svg";
import FashionIcon from "@assets/category/fashion_icon.svg";
import FoodIcon from "@assets/category/food_icon.svg";
import CharacterIcon from "@assets/category/charactor_icon.svg";
import LivingIcon from "@assets/category/living_icon.svg";
import EntertainmentIcon from "@assets/category/entertainment_icon.svg";
import GameIcon from "@assets/category/game_icon.svg";
import DigitalIcon from "@assets/category/digital_icon.svg";
import ContentsIcon from "@assets/category/contents_icon.svg";
import HobbyIcon from "@assets/category/hobby_icon.svg";

export interface CategoryProps {
    id: string,
    image: string;
    text: string;
}

const categories: CategoryProps[] = [
    {id: "beauty", image: BeautyIcon, text: "뷰티"},
    {id: "fashion", image: FashionIcon, text: "패션"},
    {id: "food", image: FoodIcon, text: "음식/음료"},
    {id: "character", image: CharacterIcon, text: "캐릭터"},
    {id: "living", image: LivingIcon, text: "리빙/금융"},
    {id: "entertainment", image: EntertainmentIcon, text: "연예"},
    {id: "game", image: GameIcon, text: "게임"},
    {id: "digital", image: DigitalIcon, text: "가전/디지털"},
    {id: "contents", image: ContentsIcon, text: "콘텐츠"},
    {id: "hobby", image: HobbyIcon, text: "취미/여가"},
];

export default categories;