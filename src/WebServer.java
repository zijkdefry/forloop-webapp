import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;

public class WebServer {
    private static String getPath(String httpRequest) {
        return httpRequest.replaceAll("GET /", "").replaceAll(" HTTP/1.1", "");
    }

    private static void serveNotFount(PrintStream out, String notFoundResource) {
        out.println("HTTP/1.1 404 Not Found");
        out.println("Content-Type: text");
        out.println();
        out.printf("404 Not Found: %s does not exist\n", notFoundResource);
    }

    private static void serve(String req, PrintStream out) {
        var resource = getPath(req);

        if (resource.isEmpty()) resource = "index.html";

        if (!Resources.has(resource)) serveNotFount(out, resource);
        
        var item = Resources.get(resource);

        out.println("HTTP/1.1 200 OK");
        out.printf("Content-Type: %s\n", item.type);
        out.println();
        out.println(item.nameContent);
    }

    private static ServerSocket server;

    public static void run() throws IOException {
        server = new ServerSocket(8080, 5);

        while (true) {
            var client = server.accept();

            var input = new BufferedReader(new InputStreamReader(client.getInputStream()));
            var req = input.readLine();

            var output = new PrintStream(client.getOutputStream());
            serve(req, output);

            output.close();
            input.close();
            client.close();
        }
    }
}
