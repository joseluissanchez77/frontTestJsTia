export interface TimeLineResponseI {
    current_page: number;
    data:         Data[];
}

export interface Data {
    review_time:            string;
    avg_score:              number;
    avg_helpfulness:        number;
    avg_helpfulness_format: string;
}
