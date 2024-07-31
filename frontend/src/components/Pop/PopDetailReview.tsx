import { useState } from "react";
import "@css/Pop/PopDetailReview.css"

import profile from '@assets/profile.svg';
import image1 from '@assets/sponge.jpg';
import image2 from '@assets/sponge2.jpg';
import image3 from '@assets/image1.svg';

const reviewsData = [
    {
        profile: profile,
        nickName: '파핑파핑 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 브로콜리',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 가지가지',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 아메리카노',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 다섯번째',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 베베베베',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 스폰지밥',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 바니바니',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '바니바니 당근당근',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '파핑파핑 당근당근',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열한번째 보더콜리',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열두번째 파핑파핑',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열세번째 브로콜리',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '열네번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '20번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '21번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
    {
        profile: profile,
        nickName: '22번째 바나나',
        date: '2024-07-16',
        image: [image1, image2, image3],
        title: '베베 더 월드 팝업스토어 오픈런한 후기(feat. 친구 파바박이랑)',
        content: '안녕하세요! 저는 오늘 친구랑 베베 더 월드 팝업 스토어에 갔는데 진짜 너무 좋아서 후기를 남겨봅니다. 꺄양아아아아아아아아아아',
    },
]

const Review = () => {
    const [reviews, setReviews] = useState(reviewsData.slice(0,10));
    const [visibleCount, setVisibleCount] = useState(10);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
        setReviews(reviewsData.slice(0, visibleCount+10));
    }

     return (
        <div id="pop-detail-reviews">
            {reviews.map((review, index) => (
                <div className="pop-review" key={index}>
                    <div className="profile">
                        <img src={review.profile} />
                        <div>
                            <div className="nickname">{review.nickName}</div>
                            <div className="review-date">{review.date}</div>
                        </div>
                    </div>
                    <div className="review-images">
                        {review.image.map((image, idx)=>(
                            <img src={image} key={idx} />
                        ))}
                    </div>
                    <div className="review-title">{review.title}</div>
                    <div className="review-content">{review.content}</div>
                </div>
            ))}
            {visibleCount<reviewsData.length && (
                <button className="load-more" onClick={loadMore}>더보기 ∨</button>
            )}
        </div>
     );
} 

export default Review;