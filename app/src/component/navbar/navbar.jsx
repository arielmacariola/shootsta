import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    collapsed: true
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";

    return (
      <nav
        data-testid="navigation"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Link data-testid="brandName" className="navbar-brand" to="/">
          {this.props.brandName}
        </Link>
        <button
          onClick={this.toggleNavbar}
          className={`${classTwo}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${classOne}`} id="navbarNav">
          <ul className="navbar-nav">
            {this.props.menuList.map((menuItem, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  to={menuItem.linkTo}
                  className="nav-link"
                  activeStyle={{ color: "#27baa1" }}
                  exact
                >
                  {menuItem.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
