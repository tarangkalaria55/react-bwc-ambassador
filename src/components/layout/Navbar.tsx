import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  UserPlus,
  Users,
  Home,
  User,
  FileText,
  Wallet,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/auth/LoginDialog";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check login status on mount and updates
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(loggedIn);
      setUserRole(role);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");

    // Dispatch custom event to notify the App component
    window.dispatchEvent(new Event("localStorageChange"));

    setIsLoggedIn(false);
    setUserRole(null);
    toast.success("Logged out successfully");

    // First navigate, then set states
    navigate("/");
    closeMenu();
  };

  const isHomePage = location.pathname === "/";
  const shouldShowJoinUs = isHomePage && !isLoggedIn;
  const isAdmin = userRole === "admin";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isAdmin) {
      e.preventDefault();
      navigate("/admin");
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isAdmin) {
      e.preventDefault();
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 w-full z-50">
      <nav
        className="bg-black shadow-md"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              {isLoggedIn && (
                <div className="flex md:hidden mr-4">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}

              <Link
                to={isAdmin ? "/admin" : "/"}
                className="flex-shrink-0"
                onClick={handleLogoClick}
              >
                <img
                  src="https://brazilianwaxingcompany.com/wp-content/uploads/2025/01/brazilianwaxingcompany.png"
                  alt="Brazilian Waxing Company"
                  className="h-12 w-auto object-contain max-w-[200px]"
                />
              </Link>
            </div>

            {/* Right side nav items */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                    onClick={handleHomeClick}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    HOME
                  </Button>

                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-bwc-gold uppercase"
                        onClick={() => navigate("/all-influencers")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        INFLUENCERS
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-bwc-gold uppercase"
                        onClick={() => navigate("/applications")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        APPLICATIONS
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-bwc-gold uppercase"
                        onClick={() => navigate("/admin-invoices")}
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        INVOICES
                      </Button>
                    </>
                  )}

                  <Button
                    variant="ghost"
                    className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                    onClick={() => navigate("/earnings-history")}
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    EARNINGS
                  </Button>

                  <Button
                    variant="ghost"
                    className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    MY ACCOUNT
                  </Button>

                  <Button
                    variant="ghost"
                    className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    LOG OUT
                  </Button>
                </>
              ) : (
                <>
                  {shouldShowJoinUs && (
                    <Button
                      variant="ghost"
                      className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                      onClick={() => navigate("/ambassador")}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      JOIN US
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    className="text-sm font-normal uppercase hover:bg-transparent hover:text-bwc-gold text-white"
                    onClick={() => setLoginOpen(true)}
                  >
                    LOG IN
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            {isLoggedIn && (
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="text-white hover:text-bwc-gold"
                >
                  <Menu size={24} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isLoggedIn && (
          <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
            <div
              className="pt-2 pb-4 bg-black"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="px-2 space-y-1">
                <button
                  className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                  onClick={() => {
                    if (isAdmin) {
                      navigate("/admin");
                    } else {
                      navigate("/");
                    }
                    closeMenu();
                  }}
                >
                  <Home className="h-4 w-4 mr-2" />
                  HOME
                </button>

                {isAdmin && (
                  <>
                    <button
                      className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                      onClick={() => {
                        navigate("/all-influencers");
                        closeMenu();
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      INFLUENCERS
                    </button>
                    <button
                      className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                      onClick={() => {
                        navigate("/applications");
                        closeMenu();
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      APPLICATIONS
                    </button>
                    <button
                      className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                      onClick={() => {
                        navigate("/admin-invoices");
                        closeMenu();
                      }}
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      INVOICES
                    </button>
                  </>
                )}

                <button
                  className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                  onClick={() => {
                    navigate("/earnings-history");
                    closeMenu();
                  }}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  EARNINGS
                </button>

                <button
                  className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  MY ACCOUNT
                </button>

                <button
                  className="block px-3 py-2 text-base font-medium text-center uppercase text-white hover:text-bwc-gold w-full text-left flex items-center"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Dialog */}
        <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

        {/* Mobile menu panel */}
        {isLoggedIn && (
          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogContent className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                  className="-m-1.5 p-1.5"
                >
                  <span className="sr-only">BWC</span>
                  <img
                    className="h-8 w-auto"
                    src="https://brazilianwaxingcompany.com/wp-content/uploads/2025/01/brazilianwaxingcompany.png"
                    alt="BWC"
                  />
                </Button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      HOME
                    </Button>

                    {isAdmin && (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate("/all-influencers");
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          INFLUENCERS
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate("/applications");
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                        >
                          <FileText size={16} className="mr-2" />
                          APPLICATIONS
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate("/admin-invoices");
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                        >
                          <Receipt size={16} className="mr-2" />
                          INVOICES
                        </Button>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/earnings-history");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      EARNINGS
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/profile");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                    >
                      <User className="h-4 w-4 mr-2" />
                      MY ACCOUNT
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-bwc-charcoal hover:text-bwc-gold"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      LOG OUT
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
