import React from 'react';
import { Link } from 'react-router-dom';

import navs from 'fixtures/navs';

import { StyledNav, Menu, SubMenu, ThirdMenu } from './style';

function Navigation() {
   return (
      <StyledNav>
         <Menu data-testid="nav">
            {navs.map((nav, index) => (
                  <li key={`nav_${nav.id}`}>
                     <Link to={nav.url}>{nav.label}</Link>
                     {nav.children && (
                        <SubMenu data-testid={`nav_${index}-subNav`}>
                           {nav.children.map((subNav, subIndex) => (
                              <li key={`subNav_${subNav.id}`}>
                                 <Link to={subNav.url}>{subNav.label}</Link>
                                 {subNav.children && (
                                    <ThirdMenu
                                       data-testid={`nav_${index}-subNav_${subIndex}-thirdNav`}
                                    >
                                       {subNav.children.map((thirdNav) => (
                                          <li key={`thirdNav_${thirdNav.id}`}>
                                             <Link to={thirdNav.url}>
                                                {thirdNav.label}
                                             </Link>
                                          </li>
                                       ))}
                                    </ThirdMenu>
                                 )}
                              </li>
                           ))}
                        </SubMenu>
                     )}
                  </li>
               ))}
         </Menu>
      </StyledNav>
   );
}

export default Navigation;
