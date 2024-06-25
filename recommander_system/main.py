import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import random


def connect_to_mongodb():
    try:
        connection_string = os.getenv('DB_STRING')
        client = MongoClient(connection_string)
        
        return client
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def generate_data():
    client=connect_to_mongodb()
    db=client["CAR_DEALERSHIP_PRODUCTION"]
    user_collection=db["User"]
    car_collection=db["Car"]

    users=list(user_collection.distinct("user_email"))
    cars=list(car_collection.distinct("name"))

    #creating data
    new_car_list=[]
    for i in range(0,100):
        index=random.randint(0,len(cars)-1)
        new_car_list.append(cars[index])

    rating_vector=[]
    new_users=[]
    for j in new_car_list:
        rate=random.randint(1,7)
        index=random.randint(0,len(users)-1)
        user=users[index]
        new_users.append(user)
        rating_vector.append(rate)

    data={
        "users":new_users,
        "cars":new_car_list,
        "rating":rating_vector
    }
    return data


def calculate_cosine_vectors():
    df=pd.DataFrame(generate_data())
    user_rated_more = df.groupby('users').count()['cars'] >4#users who have rated more than 2 cars

    padhe_like_users=user_rated_more[user_rated_more].index

    filtered_df=df[df['users'].isin(padhe_like_users)]
    x=filtered_df.groupby('cars').count()["rating"]>2#cars who have rated more than 2 users
    famous_cars=x[x].index
    filtered_df=filtered_df[filtered_df["cars"].isin(famous_cars)]
    final_df=filtered_df.drop_duplicates()

    pt=final_df.pivot_table(index="cars",columns="users",values="rating")
    pt.fillna(0,inplace=True)

    cosined_pt=cosine_similarity(pt)
    return pt,cosined_pt


def recommand(car_name):
    pt,cosined_pt=calculate_cosine_vectors()
    index=np.where(pt.index==car_name)[0][0]
    if index>=cosined_pt.shape[0]:
        print("no book to recommand")
        return
    similar_items=sorted(list(enumerate(cosined_pt[index])),key=lambda x:x[1],reverse=True)[1:6]
    for i in similar_items:
        print(pt.index[i[0]])
    
