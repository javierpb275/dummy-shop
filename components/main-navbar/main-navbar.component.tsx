import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "@components/navbar/navbar.component";
import { Typography } from "@mui/material";
import { ProductService } from "services/productService";
import { capitalizeFirstLetter } from "helpers/helpers";
import Link from "next/link";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MainNavbarProps = {
  children: React.ReactNode;
  toggleTheme?: () => void;
};

export default function MainNavbar(props: MainNavbarProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [cleanedUp, setCleanedUp] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!cleanedUp) {
      const fetchData = async () => {
        const data = await ProductService.getCategories();
        setCategories(data);
      };
      fetchData().catch((err) => {
        setError("Error Loading Categories.");
      });
    }
    return () => setCleanedUp(true);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        toggleTheme={props.toggleTheme}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography>CATEGORIES</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {error.length ? (
          <ListItemText primary={error} />
        ) : (
          <List>
            {categories.map((text, index) => (
              <List key={index}>
                <Link
                  href={`/products/category/${text}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={capitalizeFirstLetter(text.replace(/-/g, " "))}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            ))}
          </List>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
