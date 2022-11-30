import React from 'react';
import { Link } from 'react-router-dom';

import { StyledNav, Menu, SubMenu, ThirdMenu } from './style';

function Navigation() {
   return (
      <StyledNav>
         <Menu>
            <li>
               <Link to="/">Home</Link>
               <SubMenu>
                  <li>
                     <Link to="/">2</Link>
                     <ThirdMenu>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                     </ThirdMenu>
                  </li>
                  <li>
                     <Link to="/">2</Link>
                     <ThirdMenu>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                     </ThirdMenu>
                  </li>
                  <li>
                     <Link to="/">2</Link>
                  </li>
               </SubMenu>
            </li>
            <li>
               <Link to="/">Shop</Link>
            </li>
            <li>
               <Link to="/">Pages</Link>
               <SubMenu>
                  <li>
                     <Link to="/">2</Link>
                     <ThirdMenu>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                        <li>
                           <Link to="/">3</Link>
                        </li>
                     </ThirdMenu>
                  </li>
                  <li>
                     <Link to="/">2</Link>
                     <ThirdMenu>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                        <li>
                           <Link to="/">4</Link>
                        </li>
                     </ThirdMenu>
                  </li>
                  <li>
                     <Link to="/">2</Link>
                  </li>
               </SubMenu>
            </li>
         </Menu>
      </StyledNav>
   );
}

export default Navigation;
