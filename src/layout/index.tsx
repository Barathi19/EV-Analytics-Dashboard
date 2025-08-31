import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen text-text flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white px-3 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold">EV Analytics Dashboard</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-3 sm:px-6 py-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
