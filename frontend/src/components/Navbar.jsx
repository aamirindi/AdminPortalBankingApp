import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavStyled>
      <div className="container">
        <div className="logo-brand">
          <NavLink exact to="/" activeClassName="active-link">
            <h3>Admin Portal</h3>
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                className="link"
                activeClassName="active-link">
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className="link"
                activeClassName="active-link">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className="link"
                activeClassName="active-link">
                Search User
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.div`
  .container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    h3 {
      font-size: 1.8rem;
      letter-spacing: 0.2rem;
      font-weight: 500;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3.2rem;
      width: 100%;
      .active {
        color: var(--btn-color);
        font-size: 1.2rem;
        font-weight: 600;
        transition: all 0.4s ease-in-out;
      }
      li {
        list-style: none;
        a {
          color: #818181;
        }
      }
    }
  }

  @media (max-width: 960px) {
    nav {
      display: none;
    }
  }
`;

export default Navbar;
