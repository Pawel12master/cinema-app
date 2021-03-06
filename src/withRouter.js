import React from "react";
import { useParams, useNavigate } from "react-router";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        navigate = {useNavigate()}
      />
    );
  };

  export default withRouter;