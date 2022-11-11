import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwitchMode from "@components/switch-mode/switch-mode.component";
import { useAuthActions, useAuthState } from "@store/contexts/auth.context";
import { PageType } from "types";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducers";
import { useMemo } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CustomPopover from "@components/custom-popover/custom-popover.component";
//import SelectLanguage from "@components/select-language/select-language.component";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  children?: React.ReactNode;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type NavbarProps = {
  toggleTheme?: () => void;
  open?: boolean;
  handleDrawerOpen?: () => void;
};

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenCart = Boolean(anchorElCart);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const searchByText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const text = event.target.value;
    router.push(`/products/search/${text}`);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseCart = () => {
    setAnchorElCart(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signout = () => {
    logout();
    handleMenuClose();
  };

  const goTo = (page: PageType) => {
    if (page === "home") {
      handleMenuClose();
      router.push("/");
    }
    if (page === "signin") {
      handleMenuClose();
      router.push("/signin");
    }
    if (page === "signup") {
      handleMenuClose();
    }
    if (page === "profile") {
      handleMenuClose();
    }
    if (page === "checkout") {
      handleMenuClose();
      router.push("/checkout");
    }
  };

  const products = useSelector((state: RootState) => state.cart.products);
  const totalProducts = useMemo(() => {
    return products.reduce((total, product) => {
      total += product.quantity;
      return total;
    }, 0);
  }, [products]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
          <MenuItem onClick={() => goTo("profile")}>Profile Settings</MenuItem>
          <MenuItem onClick={signout}>Log Out</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={() => goTo("signin")}>Log In</MenuItem>
          <MenuItem onClick={() => goTo("signup")}>Register</MenuItem>
        </div>
      )}
    </Menu>
  );

  const menuIdCart = "primary-search-cart-menu";
  const renderMenuCart = (
    <Menu
      anchorEl={anchorElCart}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuIdCart}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpenCart}
      onClose={handleMenuCloseCart}
    >
      <MenuItem onClick={() => goTo("checkout")}>Checkout</MenuItem>
      <MenuItem onClick={handleMenuCloseCart}>Product</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <SwitchMode toggleTheme={props.toggleTheme} />
      </MenuItem>
      <MenuItem onClick={handleCartMenuOpen}>
        <IconButton
          size="large"
          aria-label="show products"
          color="inherit"
          aria-controls="primary-search-cart-menu"
          aria-haspopup="true"
        >
          <Badge badgeContent={totalProducts} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {user ? (
            user.image ? (
              <Avatar
                alt={user.username}
                src={user.image}
                sx={{ height: "35px", width: "35px" }}
              />
            ) : (
              <Avatar sx={{ height: "35px", width: "35px" }}>
                {user.username.charAt(0)}
              </Avatar>
            )
          ) : (
            <Avatar sx={{ height: "35px", width: "35px" }} />
          )}
        </IconButton>
        {user ? <p>{user.username}</p> : <p>Profile</p>}
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      open={props.open}
      sx={{ bgcolor: "secondary.main", flexGrow: 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          sx={{ mr: 2, ...(props.open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
          onClick={() => goTo("home")}
        >
          DUMMY
        </Typography>
        <Search onChange={(e: any) => searchByText(e)}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {/* <SelectLanguage/> */}
          <SwitchMode toggleTheme={props.toggleTheme} />

          <IconButton
            size="large"
            aria-label="show products"
            color="inherit"
            aria-controls={menuIdCart}
            aria-haspopup="true"
            onClick={handleCartMenuOpen}
          >
            <CustomPopover text="Cart">
              <Badge badgeContent={totalProducts} color="error">
                <ShoppingCartIcon />
              </Badge>
            </CustomPopover>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {user ? (
              <CustomPopover text={user.username}>
                {user.image ? (
                  <Avatar
                    alt={user.username}
                    src={user.image}
                    sx={{ height: "35px", width: "35px" }}
                  />
                ) : (
                  <Avatar sx={{ height: "35px", width: "35px" }}>
                    {user.username.charAt(0)}
                  </Avatar>
                )}
              </CustomPopover>
            ) : (
              <CustomPopover text="Profile">
                <Avatar sx={{ height: "35px", width: "35px" }} />
              </CustomPopover>
            )}
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenuCart}
    </AppBar>
  );
}
