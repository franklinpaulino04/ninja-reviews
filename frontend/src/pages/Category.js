import {Link, useParams} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
// import moment from "moment";

/**
 * ----- graphql -----
 *
 */
const CATEGORY = gql`
    query getCategory($id: ID!){
        category(id: $id){
            id,
            name,
            reviews{
                id,
                title,
                rating,
                body,
                created_at,
                categories{
                   id,
                   name
                }
            }
        }
     } 
`;


const Category = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(CATEGORY,{
        variables:{ id }
    });

    if(loading){ return <p>Loading...</p> }

    if(error){ return <p>Error :(</p> }

    return (
        <div>
            <h2>{ data.category.name }</h2>
            {data.category.reviews.map(review => (
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

export default Category;