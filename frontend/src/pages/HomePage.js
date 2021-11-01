import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
// import moment from 'moment'

// hooks
// import useFetch from "../hooks/useFetch";

/**
 * ----- graphql -----
 *
 */
const REVIEWS = gql`
    query getReviews{
        reviews{
        title,
        rating,
        body,
        created_at,
        id, 
        categories{
            id,
            name
           }
        }
     } 
`;

const HomePage = () => {

    // const { loading, error, data } = useFetch(`http://localhost:1337/reviews`);

    const { loading, error, data } = useQuery(REVIEWS);

    if(loading){ return <p>Loading...</p> }

    if(error){ return <p>Error :(</p> }

    return (
        <div>
            {data.reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating} </div>
                    <h2>{review.title}</h2>

                    {/*<small> {moment(data.created_at).format("YYYY-MM-DD")}</small>*/}
                    {/*<br/>*/}

                    {review.categories.map(c => (
                        <small key={c.id}>{c.name}</small>
                    ))}

                    <p>{review.body.substring(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}> Read more</Link>
                </div>
            ))}
        </div>
    );
}

export default HomePage;