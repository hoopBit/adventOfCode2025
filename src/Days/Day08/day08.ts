/**
 * A junction box is identified by:
 * - id: based on the position in the input list
 * - (x, y, z): 3D coordinates
 */
type JunctionBox = {
    id: number;
    x: number;
    y: number;
    z: number;
};

/**
 * A connection is identified with:
 * - a, b: IDs of a junction box
 * - dist: distance between the two
 */
type Connection = {
    a: number;
    b: number;  
    dist: number;
};

// connection's limit
const LIMIT = 1000;

// Disjoint Set Union
class UnionFind {
    private parent: number[];
    private size: number[];
    public numSets: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
        this.numSets = n; // starting with n separate sets
    }

    // find set's root of element 'i'
    find(i: number): number {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }

    // merges sets containing 'i' and 'j'
    union(i: number, j: number): boolean {
        const rootA = this.find(i);
        const rootB = this.find(j);

        if (rootA !== rootB) {
            // combine the smaller set with the larger one
            if (this.size[rootA] < this.size[rootB]) {
                this.parent[rootA] = rootB;
                this.size[rootB] += this.size[rootA];
            } else {
                this.parent[rootB] = rootA;
                this.size[rootA] += this.size[rootB];
            }
            this.numSets--;
            return true;
        } else return false;
    }

    getPart1Result(): number {
        const sizes: number[] = [];

        for (let i = 0; i < this.parent.length; i++) {
            // if a node is the parent of itself, it is the root of a circuit
            if (this.parent[i] === i) {
                sizes.push(this.size[i]);
            }
        }
        return sizes.sort((a, b) => b - a).slice(0, 3).reduce((acc, val) => acc * val, 1);
  }
}

const solve = (input: string[]) => {
    let part1: number | null = null;
    let part2: number | null = null;

    const boxes: JunctionBox[] = input.map((line, index) => {
        const [x, y, z] = line.split(",").map(Number);
        return { id: index, x, y, z };
    });

    const connections: Connection[] = [];

    for (let index1 = 0; index1 < boxes.length; index1++) {
        for (let index2 = index1 + 1; index2 < boxes.length; index2++) {
            const b1 = boxes[index1];
            const b2 = boxes[index2];
            
            // 3D Euclidean distance
            const dist = Math.hypot(b1.x - b2.x, b1.y - b2.y, b1.z - b2.z);
            
            connections.push({ a: index1, b: index2, dist });
        }
    }

    connections.sort((c1, c2) => c1.dist - c2.dist);

    const uf = new UnionFind(boxes.length);

    for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const merged = uf.union(conn.a, conn.b);

        // ----- CHECK PART 1 -----
        // check after 1000 connections
        if (i === 999) {
            part1 = uf.getPart1Result();
        }

        // --- CHECK PARTE 2 ---
        // check when numSets drop to one
        if (merged && uf.numSets === 1 && part2 === null) {
            part2 = boxes[conn.a].x * boxes[conn.b].x;
        }

        if (part1 !== null && part2 !== null) {
            break;
        }
    }

    return {
        part1: () => part1,
        part2: () => part2
    };
};

//----- main -----
import useFileReader from '../../utils/fileReader';

const lines = useFileReader().readFile("input.txt").split("\n");

const results = solve(lines);

console.log(`Part 1: ${results.part1()}`);
console.log(`Part 2: ${results.part2()}`);