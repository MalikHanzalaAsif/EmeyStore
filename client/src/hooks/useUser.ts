import { useQuery } from '@tanstack/react-query';
import useStore from '../store/store';
import { getUserApi } from '../api/userApi';
import { userInterface } from '../utils/types';

const useUser = () => {
  const { setUser } = useStore();

 const {isSuccess} = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    select: (data) => setUser(data),
  });

  if(isSuccess) {
    console.log("fetched data succesfully!")
  }

};

export default useUser;