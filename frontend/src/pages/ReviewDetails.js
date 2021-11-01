import {Link, useParams} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
// import moment from 'moment'

// hooks
// import useFetch from "../hooks/useFetch";

/**
 * ----- graphql -----
 *
 */
const REVIEW = gql`
    query getReview($id: ID!){
        review(id: $id){
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

const ReviewDetails = () => {
    const { id } = useParams();
    // const { loading, error, data } = useFetch(`http://localhost:1337/reviews/${id}`);
    const { loading, error, data } = useQuery(REVIEW, {
        variables: {id},
    });

    if(loading){ return <p>Loading...</p> }

    if(error){ return <p>Error :(</p> }

    return (
        <div>
            <div key={data.review.id} className="review-card">
                <div className="rating">{data.review.rating} </div>
                <h2>{data.review.title}</h2>

                {/*<small> {moment(data.review.created_at).format("YYYY-MM-DD")}</small>*/}
                {/*<br/>*/}

                {data.review.categories.map(c => (
                    <small key={c.id}>{c.name}</small>
                ))}

                <p>{data.review.body}</p>
                <Link to={`/`}> Go back</Link>
            </div>
        </div>
    );
}

export default ReviewDetails;