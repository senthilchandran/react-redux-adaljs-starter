import "./footer.scss";
import { Resources } from "../../resources";
import * as React from "react";
import { Grid } from "@material-ui/core";

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer">
                <Grid
                    justify="flex-end"
                    container
                    spacing={24}
                >
                    <Grid item>
                        <a href="mailto:csenthil31@gmail.com">{Resources.Footer.ContactUs}</a>
                    </Grid>
                    <Grid item>
                        <div> © Senthil {new Date().getFullYear()}</div>
                    </Grid>
                </Grid>          
        </div>
      </footer>
    )
  }
}

  