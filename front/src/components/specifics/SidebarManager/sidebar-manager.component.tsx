import type { SidebarManagerProps } from "./sidebar-manager.types";
import classNames from "classnames";
import { Link } from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@andrevantunes/andrevds";

const sidebarIsOpenClassName = "sidebar--is-open";
const SidebarManager = ({
  sidebarItems,
  className,
  title,
  onClick,
  ...props
}: SidebarManagerProps) => {
  const closeSidebar = () => document.body.classList.remove(sidebarIsOpenClassName);
  const pathname = typeof window == "undefined" ? "" : window.location.pathname;

  const cn = classNames("sidebar-manager", className);
  const [activePage, setActivePage] = useState("minha-turma");
  useEffect(() => {
    if (!/\/(redacao|formularios|dashboard|videos)/.test(pathname)) {
      setActivePage("minha-turma");
    } else {
      const path = String(pathname.split("/")[1]);
      setActivePage(path);
    }
  }, [pathname]);

  return (
    <div className={cn} {...props} onClick={closeSidebar}>
      <div className="sidebar-manager__overlay" />
      <aside className="sidebar sidebar-manager__sidebar flex flex-column align-items-stretch">
        <div className="pt-2x pb-2x flex justify-content-center"></div>

        <div className="card sidebar__profile-container">
          <div
            className="avatar sidebar__profile-container__avatar avatar--size-md"
            data-testid="sidebar__user-avatar"
            style={{
              backgroundImage:
                "url(https://cdn.mesalva.com/uploads/user/image/YW5kcmUuYW50dW5lc0BtZXNhbHZhLmNvbTE3MTAyMDIzVDE0MzM%3D.jpeg)",
            }}
          ></div>
          <div className="flex-column align-items-start">
            <h3 className="subtitle subtitle--size-md" data-testid="sidebar__user-name">
              André Antunes
            </h3>
            <Link
              className="link link sidebar__profile-container__profile-link link--primary link--primary"
              href="/login"
            >
              Configurações
            </Link>
          </div>
        </div>

        <div>
          <p className="sidebar__list-title" data-testid="sidebar__title"></p>
          <Link
            className={classNames("link link sidebar-item link--primary link--primary", {
              "sidebar-item--is-active": activePage === "minha-turma",
            })}
            href="/minha-turma"
            data-testid="sidebar__item"
            id="event--product--painel"
          >
            <span data-testid="painel" data-name="painel" className="icon">
              <Icon name="apostila" />
            </span>
            Minha turma
          </Link>
          <Link
            className={classNames("link link sidebar-item link--primary link--primary", {
              "sidebar-item--is-active": activePage === "dashboard",
            })}
            href="/dashboard"
            data-testid="sidebar__item"
            id="event--product--painel"
          >
            <span data-testid="painel" data-name="painel" className="icon">
              <Icon name="vestibulares" />
            </span>
            Dashboard
          </Link>
          <Link
            className={classNames("link link sidebar-item link--primary link--primary", {
              "sidebar-item--is-active": activePage === "videos",
            })}
            href="/videos"
            data-testid="sidebar__item"
            id="event--product--painel"
          >
            <span data-testid="painel" data-name="painel" className="icon">
              <Icon name="aula-ao-vivo" />
            </span>
            Vídeos
          </Link>
          <Link
            className={classNames("link link sidebar-item link--primary link--primary", {
              "sidebar-item--is-active": activePage === "redacao",
            })}
            href="/redacao"
            data-testid="sidebar__item"
            id="event--product--painel"
          >
            <span data-testid="painel" data-name="painel" className="icon">
              <Icon name="correcao" />
            </span>
            Redação
          </Link>
          <Link
            className={classNames("link link sidebar-item link--primary link--primary", {
              "sidebar-item--is-active": activePage === "formularios",
            })}
            href="/formularios"
            data-testid="sidebar__item"
            id="event--product--painel"
          >
            <span data-testid="painel" data-name="painel" className="icon">
              <Icon name="exercicio" />
            </span>
            Formulários
          </Link>
        </div>
      </aside>
    </div>
  );
};

SidebarManager.open = () => {
  document.body.classList.add(sidebarIsOpenClassName);
};

export default SidebarManager;
