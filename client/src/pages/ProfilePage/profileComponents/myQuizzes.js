import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../../../utils/queries";

const MyQuizzes = ({ userId }) => {
    console.log(userId);

const { loading, data } = useQuery(QUERY_QUIZZES, {
    variables: { _id: userId }
});
console.log(data);
    return (
        <>
        <div>testing</div>
        </>
    )
}

export default MyQuizzes;