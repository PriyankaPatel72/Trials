export default function Footer() {
  return (
    <footer className="bg-red-600 shadow-md mt-12 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <p className="text-lg text-white">
          &copy; {new Date().getFullYear()} University of Maryland TerpTrials. All rights reserved.
        </p>
      </div>
    </footer>
  );
}