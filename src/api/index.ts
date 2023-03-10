import axios from 'axios';
import { NewStory } from '../types';

const firstElement = 0;
const onehungredElement = 100;

const URL = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
const URL_ITEM = "https://hacker-news.firebaseio.com/v0/item/";

export async function getDataRequest() {
    const { data } = await axios.get(URL);

    const top100NewsArray: number[] = data.slice(firstElement, onehungredElement);

    const newsData = await axios.all(
        top100NewsArray.map(
            (el: number) => axios.get(`${URL_ITEM}${el}.json?print=pretty`)
        )
    ).catch(err => console.log(err)) as NewStory[];

    return newsData;
}
