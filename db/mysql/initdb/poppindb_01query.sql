-- user 테이블에 더미 데이터 삽입
INSERT INTO poppin.user (user_tsid, provider_id, provider_name, name, nickname, email, age, gender, phone_number, role, img, state) VALUES
(1, 'provider1', 'google', '김철수', 'cheolsu', 'cheolsu@example.com', '30', 'M', '010-1234-5678', 'user', 'img1.jpg', 1),
(2, 'provider2', 'kakao', '이영희', 'younghee', 'younghee@example.com', '25', 'F', '010-2345-6789', 'user', 'img2.jpg', 1),
(3, 'provider3', 'naver', '박민준', 'minjun', 'minjun@example.com', '28', 'M', '010-3456-7890', 'user', 'img3.jpg', 1),
(4, 'provider4', 'google', '최영수', 'youngsu', 'youngsu@example.com', '32', 'M', '010-4567-8901', 'user', 'img4.jpg', 1),
(5, 'provider5', 'kakao', '정지혜', 'jihye', 'jihye@example.com', '27', 'F', '010-5678-9012', 'user', 'img5.jpg', 1),
(6, 'provider6', 'naver', '김다솜', 'dasom', 'dasom@example.com', '29', 'F', '010-6789-0123', 'user', 'img6.jpg', 1),
(7, 'provider7', 'google', '박성준', 'seongjun', 'seongjun@example.com', '31', 'M', '010-7890-1234', 'user', 'img7.jpg', 1),
(8, 'provider8', 'kakao', '이민지', 'minji', 'minji@example.com', '26', 'F', '010-8901-2345', 'user', 'img8.jpg', 1),
(9, 'provider9', 'naver', '홍길동', 'gildong', 'gildong@example.com', '34', 'M', '010-9012-3456', 'user', 'img9.jpg', 1),
(10, 'provider10', 'google', '서준호', 'junho', 'junho@example.com', '33', 'M', '010-0123-4567', 'user', 'img10.jpg', 1);

-- manager 테이블에 더미 데이터 삽입
INSERT INTO poppin.manager (manager_tsid, nickname, id, password, img, state) VALUES
(1, 'manager1', 'manager1_id', 'password1', 'manager_img1.jpg', 1),
(2, 'manager2', 'manager2_id', 'password2', 'manager_img2.jpg', 1),
(3, 'manager3', 'manager3_id', 'password3', 'manager_img3.jpg', 1),
(4, 'manager4', 'manager4_id', 'password4', 'manager_img4.jpg', 1),
(5, 'manager5', 'manager5_id', 'password5', 'manager_img5.jpg', 1);

-- popup 테이블에 더미 데이터 삽입
INSERT INTO poppin.popup (popup_id, manager_tsid, name, start_date, end_date, hours, description, sns_url, page_url, content, lat, lon, heart, hit, rating) VALUES
(1, 1, '첫 번째 팝업', '2024-08-01', '2024-08-31', '9:00-18:00', '첫 번째 팝업 설명', 'http://sns1.com', 'http://page1.com', '첫 번째 팝업 내용', 37.5665, 126.9780, 10, 100, 4.5),
(2, 2, '두 번째 팝업', '2024-09-01', '2024-09-30', '10:00-19:00', '두 번째 팝업 설명', 'http://sns2.com', 'http://page2.com', '두 번째 팝업 내용', 35.1796, 129.0756, 20, 200, 4.0),
(3, 3, '세 번째 팝업', '2024-10-01', '2024-10-31', '11:00-20:00', '세 번째 팝업 설명', 'http://sns3.com', 'http://page3.com', '세 번째 팝업 내용', 35.6895, 139.6917, 30, 300, 3.5),
(4, 1, '네 번째 팝업', '2024-08-01', '2024-08-31', '9:00-18:00', '네 번째 팝업 설명', 'http://sns4.com', 'http://page4.com', '네 번째 팝업 내용', 37.5665, 126.9780, 15, 150, 4.7),
(5, 2, '다섯 번째 팝업', '2024-09-01', '2024-09-30', '10:00-19:00', '다섯 번째 팝업 설명', 'http://sns5.com', 'http://page5.com', '다섯 번째 팝업 내용', 35.1796, 129.0756, 25, 250, 4.2);

-- category 테이블에 더미 데이터 삽입
INSERT INTO poppin.category (category_id, name) VALUES
(1, '카테고리1'),
(2, '카테고리2'),
(3, '카테고리3'),
(4, '카테고리4'),
(5, '카테고리5');

-- popup_category 테이블에 더미 데이터 삽입
INSERT INTO poppin.popup_category (popup_category_id, popup_id, category_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 1, 2),
(7, 2, 3),
(8, 3, 4),
(9, 4, 5),
(10, 5, 1);

-- popup_image 테이블에 더미 데이터 삽입
INSERT INTO poppin.popup_image (popup_image_id, popup_id, img, seq) VALUES
(1, 1, 'popup_img1.jpg', 1),
(2, 2, 'popup_img2.jpg', 1),
(3, 3, 'popup_img3.jpg', 1),
(4, 4, 'popup_img4.jpg', 1),
(5, 5, 'popup_img5.jpg', 1),
(6, 1, 'popup_img6.jpg', 2),
(7, 2, 'popup_img7.jpg', 2),
(8, 3, 'popup_img8.jpg', 2),
(9, 4, 'popup_img9.jpg', 2),
(10, 5, 'popup_img10.jpg', 2);

-- heart 테이블에 더미 데이터 삽입
INSERT INTO poppin.heart (heart_id, popup_id, user_tsid) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 1, 6),
(7, 2, 7),
(8, 3, 8),
(9, 4, 9),
(10, 5, 10);

-- review 테이블에 더미 데이터 삽입
INSERT INTO poppin.review (review_id, popup_id, user_tsid, rating, title, thumbnail, content, created_at, is_deleted) VALUES
(1, 1, 1, 4.5, '첫 번째 리뷰', 'review_img1.jpg', '첫 번째 리뷰 내용', '2024-08-01 10:00:00', 0),
(2, 2, 2, 4.0, '두 번째 리뷰', 'review_img2.jpg', '두 번째 리뷰 내용', '2024-09-01 11:00:00', 0),
(3, 3, 3, 3.5, '세 번째 리뷰', 'review_img3.jpg', '세 번째 리뷰 내용', '2024-10-01 12:00:00', 0),
(4, 4, 4, 4.7, '네 번째 리뷰', 'review_img4.jpg', '네 번째 리뷰 내용', '2024-08-01 13:00:00', 0),
(5, 5, 5, 4.2, '다섯 번째 리뷰', 'review_img5.jpg', '다섯 번째 리뷰 내용', '2024-09-01 14:00:00', 0);

-- review_comment 테이블에 더미 데이터 삽입
INSERT INTO poppin.review_comment (review_comment_id, review_id, user_tsid, content, created_at, is_deleted) VALUES
(1, 1, 1, '첫 번째 댓글 내용', '2024-08-01 15:00:00', 0),
(2, 2, 2, '두 번째 댓글 내용', '2024-09-01 16:00:00', 0),
(3, 3, 3, '세 번째 댓글 내용', '2024-10-01 17:00:00', 0),
(4, 4, 4, '네 번째 댓글 내용', '2024-08-01 18:00:00', 0),
(5, 5, 5, '다섯 번째 댓글 내용', '2024-09-01 19:00:00', 0);

-- user_refresh_token 테이블에 더미 데이터 삽입
INSERT INTO poppin.user_refresh_token (user_refresh_token_id, user_tsid, refresh_token) VALUES
(1, 1, 'refresh_token_1'),
(2, 2, 'refresh_token_2'),
(3, 3, 'refresh_token_3'),
(4, 4, 'refresh_token_4'),
(5, 5, 'refresh_token_5'),
(6, 6, 'refresh_token_6'),
(7, 7, 'refresh_token_7'),
(8, 8, 'refresh_token_8'),
(9, 9, 'refresh_token_9'),
(10, 10, 'refresh_token_10');

-- manager_refresh_token 테이블에 더미 데이터 삽입
INSERT INTO poppin.manager_refresh_token (manager_refresh_token_id, manager_tsid, refresh_token) VALUES
(1, 1, 'manager_refresh_token_1'),
(2, 2, 'manager_refresh_token_2'),
(3, 3, 'manager_refresh_token_3'),
(4, 4, 'manager_refresh_token_4'),
(5, 5, 'manager_refresh_token_5');