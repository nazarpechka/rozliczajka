import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const useRequest = (url, method, onSuccess, onError) => {
  const { user } = useContext(UserContext);

  const request = (data) => {
    const options = {
      url,
      method,
      data,
      headers: {
        "x-access-token": user ? user.token : "",
      },
    };

    axios(options)
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch((e) => {
        onError(e.response ? e.response.data.message : e.message);
      });
  };

  return request;
};

export default useRequest;