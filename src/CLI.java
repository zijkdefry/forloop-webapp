import java.io.IOException;
import java.util.Scanner;

public class CLI {
    public static void startAsync() {
        var thr = new Thread(() -> cli());
        thr.start();
    }

    private static Scanner scn = new Scanner(System.in);

    private static void cli() {
        var cmdPrevious = new String[0];
        var usePrev = false;
        
        while (true) {
            String[] cmd;

            if (usePrev) {
                cmd = cmdPrevious;
                usePrev = false;
                if (isEmptyCmd(cmd)) continue;
            } else {
                System.out.print("server :: ");
                cmd = scn.nextLine().split(" ", -1);
                
                if (isEmptyCmd(cmd)) continue;

                if (!cmd[0].equals("r")) cmdPrevious = cmd;
            }

            if (cmd[0].equals("r")) {
                usePrev = true;
                continue;
            }
            if (cmd[0].equals("reload")) {
                if (cmd.length < 2) {
                    reloadAll();
                    continue;
                }
                
                reload(cmd[1]);
                continue;
            }
            if (cmd[0].equals("clear")) {
                System.out.print("\033\143");
                System.out.flush();
                continue;
            }
            if (cmd[0].equals("quit")) {
                System.out.println("Shutdown");
                System.exit(0);
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

    // Why is java so fricking stupid
    private static boolean isEmptyCmd(String[] cmd) {
        return cmd.length < 1 || cmd[0].length() < 1;
    }
}
