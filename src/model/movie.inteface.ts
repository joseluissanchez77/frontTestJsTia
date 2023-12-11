export interface MovieResponseI {
    current_page:   number;
    data:           Movie[];
    total_register: number;
    total_pages:    number;
}

export interface Movie {
    product_id:   string;
    categories:   string[];
    user_id:      string;
    profile_name: string;
    helpfulness:  string;
    score:        number;
    review_time:  string;
    summary:      string;
    review_text:  string;
}
