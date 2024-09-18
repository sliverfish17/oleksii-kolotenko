//@ts-nocheck

// THERE IS NO APP SO I TURNED OFF TS CHECKS NOT TO ANNOY ME IN EDITOR
// ALSO OF COURSE I WOULD DECOMPOSE THOSE STUFF BY DIFFERENT FILES TO MAKE IT MORE CLEAN AND STEADY

// added blochain enum
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // refactored blockchain function to use normal types
  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case Blockchain.Osmosis:
        return 100;
      case Blockchain.Ethereum:
        return 50;
      case Blockchain.Arbitrum:
        return 30;
      case Blockchain.Zilliqa:
        return 20;
      case Blockchain.Neo:
        return 20;
      default:
        return -99;
    }
  };

  // combine 2 functions in one
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // remove not valid balance so they wont get to sort in one function instead of 2 ifs
        return balance.amount > 0 && getPriority(balance.blockchain) > -99;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // removed extra ifs to create desc
      });
  }, [balances]); // removed price from arr deps because we dont use it here

  // removed unused formattedBalances function

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // unique key instead of index
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()} // formatting as it was in formattedBalances
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
