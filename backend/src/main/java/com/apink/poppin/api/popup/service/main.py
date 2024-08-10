# import pandas as pd
# from fastapi import FastAPI, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer, util
# from tqdm.autonotebook import tqdm, trange
# import os
# import logging
#
# os.environ['CUDA_VISIBLE_DEVICES']='9'
# logging.basicConfig(level=logging.INFO)
#
# app = FastAPI()
# model = SentenceTransformer("bespin-global/klue-sroberta-base-continue-learning-by-mnr")
#
# class PopupDTO(BaseModel):
#     popupId: int
#     name: str
#     content: str
#
# class SimilarPopupRequestDto(BaseModel):
#     currentPopupRequest: PopupDTO
#     popupListRequest: list[PopupDTO]
#
# import re
# def remove_html_tags(text):
#     clean = re.compile('<.*?>')
#     return re.sub(clean, '', text)
#
# def remove_special_characters(text):
#     return re.sub(r'[^A-Za-z가-힣\s]', '', text)
#
# korean_stopwords = set(['은', '는', '이', '가', '에', '와', '과', '도', '를', '으로', '로', '의', '하', '한', '하다', '합니다'])
#
# def remove_stopwords(text, stopwords=korean_stopwords):
#     return ' '.join([word for word in text.split() if word not in stopwords])
#
# from konlpy.tag import Okt
#
# okt = Okt()
#
# def tokenize_and_stem(text):
#     tokens = okt.morphs(text)
#     return ' '.join(tokens)
#
# def preprocess_text(text):
#     text = remove_html_tags(text)
#     text = remove_special_characters(text)
#     text = tokenize_and_stem(text)
#     text = remove_stopwords(text)
#     return text
#
# @app.post("/similar")
# async def get_similar_popups(request: SimilarPopupRequestDto):
#
#     df_popups = pd.DataFrame(
#         [{"popupId": popup.popupId, "name": popup.name, "content": popup.content, "text": preprocess_text(popup.name + " " + popup.content)} for popup in request.popupListRequest]
#     )
#
#
#     text_list = df_popups['text'].tolist()
#     text_vectors = model.encode(text_list)
#
#     current_text = preprocess_text(request.currentPopupRequest.name + " " + request.currentPopupRequest.content)
#     current_vector = model.encode(current_text)
#
#     similarities = util.cos_sim(current_vector, text_vectors).flatten()
#
#     similarities_df = pd.DataFrame({
#         'popup_id': df_popups['popupId'],
#         'name': df_popups['name'],
#         'content': df_popups['content'],
#         'similarity': similarities
#     })
#     current_popup_id = request.currentPopupRequest.popupId
#     filtered_similarities_df = similarities_df[similarities_df['popup_id'] != current_popup_id]
#     similar_popups_df = filtered_similarities_df.nlargest(10, 'similarity')
#
#     similar_popups = [
#         PopupDTO(popupId=int(row['popup_id']), name=row['name'], content=row['content'])
#         for _, row in similar_popups_df.iterrows()
#     ]
#
#     return similar_popups
#
#
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=9323)
