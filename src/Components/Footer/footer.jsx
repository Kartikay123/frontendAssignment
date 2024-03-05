import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { LinkedIn, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import './footer.css';
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "rgb(63,94,251)",
        color: "black",
        width: "100%",
        height: "5%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "13px",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid white", 
      }}
    >
      <Container maxWidth="lg">
        
        <Grid container className="footer-container">
         
          <Grid item>
            <Link href="https://www.linkedin.com/company/deeptek/" target="_blank" rel="noopener noreferrer">
              <LinkedIn style={{ color: "black", marginRight: "10px" }} />
            </Link>
            <Link href="https://www.instagram.com/deeptek.ai/" target="_blank" rel="noopener noreferrer">
              <Instagram style={{ color: "black", marginRight: "10px" }} />
            </Link>
            <Link href="https://twitter.com/DeepTekAI" target="_blank" rel="noopener noreferrer">
              <Twitter style={{ color: "black" }} />
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              &copy; {new Date().getFullYear()} XYZ Company. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
             Pallod Farms, Baner, Pune, Maharashtra 411045
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
