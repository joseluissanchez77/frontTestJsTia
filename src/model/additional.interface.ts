import { Movie } from "./movie.inteface";

export interface AdditionalResponseI {
    data_best_scores:  Movie[];
    data_worst_scores: Movie[];
    statistics:        Statistics;
}


export interface Statistics {
    amount_user: number;
    max_score:   number;
    min_score:   number;
    avg_score:   number;
}
