export interface NewStory {
    data: {
        by: string;
        descendants: number;
        id: number;
        score: number;
        time: number;
        title: string;
        type: string;
        url: string;
    }
}
