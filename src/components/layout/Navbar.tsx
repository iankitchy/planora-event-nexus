
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, X, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-planora-blue text-white font-bold rounded-md h-8 w-8 flex items-center justify-center">P</div>
          <span className="font-heading font-bold text-xl">Planora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors">
            Browse Events
          </Link>
          <Link to="/create" className="text-foreground/80 hover:text-foreground transition-colors">
            Create Event
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        {/* Right Side Items */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm">
                  Signed in as {user?.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" className="hidden md:block" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link to="/browse" className="px-2 py-1 hover:bg-muted rounded-md transition-colors" onClick={toggleMenu}>
              Browse Events
            </Link>
            <Link to="/create" className="px-2 py-1 hover:bg-muted rounded-md transition-colors" onClick={toggleMenu}>
              Create Event
            </Link>
            <Link to="/about" className="px-2 py-1 hover:bg-muted rounded-md transition-colors" onClick={toggleMenu}>
              About
            </Link>
            <div className="flex items-center space-x-2 px-2 py-1 hover:bg-muted rounded-md">
              <Search className="h-5 w-5" />
              <span>Search</span>
            </div>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-2 py-1">
                  <User className="h-5 w-5" />
                  <span>{user?.name}</span>
                </div>
                <Button variant="default" className="w-full" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
