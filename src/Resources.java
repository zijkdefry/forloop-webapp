import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

public class Resources {
    private static HashMap<String, Item> res;

    public static Item get(String resource) {
        return res.get(resource);
    }

    public static boolean has(String resource) {
        return res.containsKey(resource);
    }

    public static void load(Item[] resources) throws IOException {
        res = new HashMap<String, Item>();
        
        for (var item : resources) {
            res.put(item.nameContent, new Item(
                readFile(item.nameContent),
                item.type
            ));
        }
    }
    
    private static String readFile(String resname) throws IOException {
        return Files.readString(Path.of("webapp", resname), StandardCharsets.UTF_8);
    }
}
