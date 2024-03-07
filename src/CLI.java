import java.io.IOException;
import java.util.Scanner;

public class CLI {
    public static void startAsync() {
        var thr = new Thread(() -> cli());
        thr.start();
    }

    private static Scanner scn = new Scanner(System.in);

    private static void cli() {
        while (true) {
            System.out.print("server :: ");
            var cmd = scn.nextLine().split(" ");

            if (cmd.length < 1) continue;

            if (cmd[0].equals("quit")) {
                System.out.println("Shutdown");
                System.exit(0);
            }
            if (cmd[0].equals("reload")) {
                if (cmd.length < 2) {
                    reloadAll();
                    continue;
                }
                
                reload(cmd[1]);
                continue;
            }

            System.out.println("Unknown command");
        }
    }

    private static void reload(String resource) {
        try {
            Resource.reload(resource);
            System.out.printf("Reloaded %s successfully\n", resource);
        } catch (IOException ex) {
            System.out.printf("Unable to hot reload %s\n", resource);
        }
    }

    private static void reloadAll() {
        try {
            Resource.reloadAll();
            System.out.println("Reloaded successfully");
        } catch (IOException ex) {
            System.out.println("Unable to hot reload resources");
        }
    }
}
