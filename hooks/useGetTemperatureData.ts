import { gql, useQuery } from "@apollo/client";

const GET_TEMPERATURE_DATA = gql`
  query MyTemperature {
    me {
      home(id: "36013c85-ba95-428c-8ca3-76d81bc4180e") {
        weather {
          minTemperature
          maxTemperature
          entries {
            time
            temperature
            type
          }
        }
      }
    }
  }
`;

const useGetTemperatureData = () => {
  return useQuery(GET_TEMPERATURE_DATA);
};

export default useGetTemperatureData;
