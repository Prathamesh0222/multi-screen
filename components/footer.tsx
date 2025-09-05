export const Footer = () => {
  return (
    <div className="border-t">
      <div className="max-w-4xl mx-auto p-5 border-x">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MultiScreen. All rights reserved.
        </p>
      </div>
    </div>
  );
};
