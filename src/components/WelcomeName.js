import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const CustomTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
}))(Typography);

const WelcomeName = () => {
  const { accounts } = useMsal();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setName(accounts[0].name.split(" ")[0]);
    }
  }, [accounts]);

  if (name) {
    return <CustomTypography variant="h6">Welcome, {name}</CustomTypography>;
  } else {
    return null;
  }
};

export default WelcomeName;
