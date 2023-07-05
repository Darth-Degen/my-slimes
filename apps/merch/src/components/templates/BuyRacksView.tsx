import { Dispatch, FC, SetStateAction } from "react";
//local
import { BuyRacksContent, MerchModule } from "apps/merch/src/components";

//SEARCH FOR "TODO: needed for merch module reuse" in my-slimes TO REUSE

/*
 * page flow
 * 1. buy now
 * 2. raffle live
 *     - win
 *     - lose
 * 3. end
 */

interface Props {
  id: string;
  setIsInView: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const BuyRacksView: FC<Props> = (props: Props) => {
  const { id, setIsInView, setCurrentPage } = props;

  return (
    <MerchModule>
      <BuyRacksContent
        id={id}
        setIsInView={setIsInView}
        setCurrentPage={setCurrentPage}
      />
    </MerchModule>
  );
};

export default BuyRacksView;
